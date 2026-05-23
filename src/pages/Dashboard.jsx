/* ========================= DASHBOARD.JSX ========================= */

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = 'https://financeiro-api-production-aa9b.up.railway.app'

export default function Dashboard() {
  const [resumo, setResumo] = useState(null)
  const [transacoes, setTransacoes] = useState([])
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [tipo, setTipo] = useState('RECEITA')
  const [categoria, setCategoria] = useState('')
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('todas')

  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const nome = localStorage.getItem('nome')

  const headers = {
    Authorization: `Bearer ${token}`
  }

  useEffect(() => {
    if (!token) {
      navigate('/')
      return
    }

    buscarDados()
  }, [])

  async function buscarDados() {
    try {
      const [r, t] = await Promise.all([
        axios.get(`${API}/api/transacoes/resumo`, { headers }),
        axios.get(`${API}/api/transacoes`, { headers })
      ])

      setResumo(r.data)
      setTransacoes(t.data)
    } catch {
      navigate('/')
    }
  }

  async function handleAdd(e) {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post(
        `${API}/api/transacoes`,
        {
          descricao,
          valor: parseFloat(valor),
          tipo,
          categoria,
          data
        },
        { headers }
      )

      setDescricao('')
      setValor('')
      setCategoria('')
      setData('')

      await buscarDados()
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    localStorage.clear()
    navigate('/')
  }

  const filtradas =
    tab === 'todas'
      ? transacoes
      : transacoes.filter(t => t.tipo === tab.toUpperCase())

  const fmt = v =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(v)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: #f5f7fb;
          font-family: 'DM Sans', sans-serif;
        }

        .dash {
          min-height: 100vh;
          background: #f5f7fb;
        }

        .nav {
          height: 70px;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #d4af37, #f5d76e);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .nav-name {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #111827;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nav-user {
          color: #6b7280;
          font-size: 14px;
        }

        .nav-user span {
          color: #111827;
          font-weight: 700;
        }

        .logout-btn {
          border: none;
          padding: 10px 18px;
          border-radius: 10px;
          background: #111827;
          color: white;
          cursor: pointer;
          font-weight: 600;
        }

        .main {
          max-width: 1400px;
          margin: auto;
          padding: 40px;
        }

        .page-header {
          margin-bottom: 30px;
        }

        .page-header h1 {
          font-family: 'Syne', sans-serif;
          font-size: 42px;
          color: #111827;
          margin-bottom: 8px;
        }

        .page-header p {
          color: #6b7280;
        }

        .summary {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .summary-card {
          background: white;
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }

        .summary-label {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 10px;
        }

        .summary-value {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 800;
        }

        .receitas .summary-value {
          color: #10b981;
        }

        .despesas .summary-value {
          color: #ef4444;
        }

        .saldo .summary-value {
          color: #d4af37;
        }

        .grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 22px;
        }

        .form-card,
        .trans-card {
          background: white;
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }

        .card-title {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 24px;
        }

        .tipo-toggle {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 20px;
        }

        .tipo-btn {
          padding: 12px;
          border-radius: 12px;
          border: none;
          background: #f3f4f6;
          cursor: pointer;
          font-weight: 700;
        }

        .active-receita {
          background: #dcfce7;
          color: #15803d;
        }

        .active-despesa {
          background: #fee2e2;
          color: #dc2626;
        }

        .field {
          margin-bottom: 16px;
        }

        .field label {
          display: block;
          margin-bottom: 8px;
          font-size: 13px;
          color: #374151;
          font-weight: 600;
        }

        .field input,
        .field select {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: 1px solid #d1d5db;
          background: #f9fafb;
          outline: none;
        }

        .field input:focus,
        .field select:focus {
          border-color: #d4af37;
          background: white;
        }

        .add-btn {
          width: 100%;
          border: none;
          border-radius: 12px;
          padding: 15px;
          background: linear-gradient(135deg, #d4af37, #f5d76e);
          color: #111827;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          cursor: pointer;
          margin-top: 10px;
        }

        .trans-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .tabs {
          display: flex;
          gap: 8px;
        }

        .tab-btn {
          border: none;
          padding: 10px 16px;
          border-radius: 10px;
          background: #f3f4f6;
          cursor: pointer;
          font-weight: 600;
        }

        .tab-btn.active {
          background: #111827;
          color: white;
        }

        .trans-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .trans-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f9fafb;
          border-radius: 14px;
          padding: 16px;
        }

        .trans-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .trans-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .trans-desc {
          color: #111827;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .trans-meta {
          color: #6b7280;
          font-size: 13px;
        }

        .trans-val {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 800;
        }

        .empty {
          padding: 40px;
          text-align: center;
          color: #6b7280;
        }

        @media (max-width: 1024px) {
          .grid {
            grid-template-columns: 1fr;
          }

          .summary {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="dash">
        <nav className="nav">
          <div className="nav-brand">
            <div className="nav-icon">💰</div>
            <div className="nav-name">FinanceApp</div>
          </div>

          <div className="nav-right">
            <div className="nav-user">
              Olá, <span>{nome}</span>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              Sair
            </button>
          </div>
        </nav>

        <div className="main">
          <div className="page-header">
            <h1>Dashboard</h1>
            <p>Gerencie suas finanças com clareza</p>
          </div>

          {resumo && (
            <div className="summary">
              <div className="summary-card receitas">
                <div className="summary-label">Receitas</div>
                <div className="summary-value">
                  {fmt(resumo.totalReceitas)}
                </div>
              </div>

              <div className="summary-card despesas">
                <div className="summary-label">Despesas</div>
                <div className="summary-value">
                  {fmt(resumo.totalDespesas)}
                </div>
              </div>

              <div className="summary-card saldo">
                <div className="summary-label">Saldo Atual</div>
                <div className="summary-value">
                  {fmt(resumo.saldo)}
                </div>
              </div>
            </div>
          )}

          <div className="grid">
            <div className="form-card">
              <div className="card-title">Nova Transação</div>

              <div className="tipo-toggle">
                <button
                  className={`tipo-btn ${
                    tipo === 'RECEITA' ? 'active-receita' : ''
                  }`}
                  onClick={() => setTipo('RECEITA')}
                >
                  Receita
                </button>

                <button
                  className={`tipo-btn ${
                    tipo === 'DESPESA' ? 'active-despesa' : ''
                  }`}
                  onClick={() => setTipo('DESPESA')}
                >
                  Despesa
                </button>
              </div>

              <form onSubmit={handleAdd}>
                <div className="field">
                  <label>Descrição</label>

                  <input
                    placeholder="Ex: Salário"
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label>Valor</label>

                  <input
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    value={valor}
                    onChange={e => setValor(e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label>Categoria</label>

                  <input
                    placeholder="Ex: Alimentação"
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                  />
                </div>

                <div className="field">
                  <label>Data</label>

                  <input
                    type="date"
                    value={data}
                    onChange={e => setData(e.target.value)}
                    required
                  />
                </div>

                <button
                  className="add-btn"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Adicionando...' : '+ Adicionar'}
                </button>
              </form>
            </div>

            <div className="trans-card">
              <div className="trans-header">
                <div className="card-title">Transações</div>

                <div className="tabs">
                  {['todas', 'receita', 'despesa'].map(t => (
                    <button
                      key={t}
                      className={`tab-btn ${tab === t ? 'active' : ''}`}
                      onClick={() => setTab(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="trans-list">
                {filtradas.length === 0 ? (
                  <div className="empty">
                    Nenhuma transação encontrada.
                  </div>
                ) : (
                  filtradas.map(t => (
                    <div className="trans-item" key={t.id}>
                      <div className="trans-left">
                        <div
                          className="trans-dot"
                          style={{
                            background:
                              t.tipo === 'RECEITA'
                                ? '#10b981'
                                : '#ef4444'
                          }}
                        />

                        <div>
                          <div className="trans-desc">
                            {t.descricao}
                          </div>

                          <div className="trans-meta">
                            {t.categoria} • {t.data}
                          </div>
                        </div>
                      </div>

                      <div
                        className="trans-val"
                        style={{
                          color:
                            t.tipo === 'RECEITA'
                              ? '#10b981'
                              : '#ef4444'
                        }}
                      >
                        {t.tipo === 'RECEITA' ? '+' : '-'}
                        {fmt(t.valor)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}