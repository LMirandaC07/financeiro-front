import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = 'https://financeiro-api-production.up.railway.app'

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

  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    if (!token) { navigate('/'); return }
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
      await axios.post(`${API}/api/transacoes`, {
        descricao, valor: parseFloat(valor), tipo, categoria, data
      }, { headers })
      setDescricao(''); setValor(''); setCategoria(''); setData('')
      await buscarDados()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    localStorage.clear()
    navigate('/')
  }

  const filtradas = tab === 'todas' ? transacoes
    : transacoes.filter(t => t.tipo === tab.toUpperCase())

  const fmt = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080808; overflow-x: hidden; }

        .dash {
          min-height: 100vh;
          background: #080808;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
        }

        /* NAVBAR */
        .nav {
          height: 60px;
          background: #0a0a0a;
          border-bottom: 1px solid #141414;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nav-icon {
          width: 32px; height: 32px;
          background: #c9a844;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
        }
        .nav-name {
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #fff;
        }
        .nav-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .nav-user {
          font-size: 13px;
          color: #555;
        }
        .nav-user span { color: #888; }
        .logout-btn {
          background: transparent;
          border: 1px solid #1f1f1f;
          color: #555;
          padding: 6px 14px;
          border-radius: 7px;
          cursor: pointer;
          font-size: 12px;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }
        .logout-btn:hover { border-color: #333; color: #888; }

        /* MAIN */
        .main { padding: 32px; max-width: 1400px; margin: 0 auto; }

        /* HEADER */
        .page-header { margin-bottom: 32px; }
        .page-header h1 {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 4px;
        }
        .page-header p { color: #444; font-size: 14px; }

        /* SUMMARY CARDS */
        .summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }
        .summary-card {
          background: #0e0e0e;
          border: 1px solid #161616;
          border-radius: 16px;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }
        .summary-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
        }
        .summary-card.receitas::before { background: #34d399; }
        .summary-card.despesas::before { background: #f87171; }
        .summary-card.saldo::before { background: #c9a844; }

        .summary-label {
          font-size: 11px;
          color: #444;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 12px;
        }
        .summary-value {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .summary-card.receitas .summary-value { color: #34d399; }
        .summary-card.despesas .summary-value { color: #f87171; }
        .summary-card.saldo .summary-value { color: #c9a844; }

        /* GRID */
        .grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 20px;
          align-items: start;
        }

        /* FORM */
        .form-card {
          background: #0e0e0e;
          border: 1px solid #161616;
          border-radius: 16px;
          padding: 28px;
        }
        .card-title {
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 24px;
          letter-spacing: -0.2px;
        }

        .tipo-toggle {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 20px;
        }
        .tipo-btn {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #1f1f1f;
          background: transparent;
          color: #555;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tipo-btn.active-receita {
          background: #34d39915;
          border-color: #34d39940;
          color: #34d399;
        }
        .tipo-btn.active-despesa {
          background: #f8717115;
          border-color: #f8717140;
          color: #f87171;
        }

        .field { margin-bottom: 14px; }
        .field label {
          display: block;
          font-size: 11px;
          color: #444;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 7px;
        }
        .field input, .field select {
          width: 100%;
          background: #080808;
          border: 1px solid #1a1a1a;
          border-radius: 9px;
          padding: 11px 14px;
          color: #fff;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s;
        }
        .field input:focus, .field select:focus { border-color: #c9a84460; }
        .field input::placeholder { color: #2a2a2a; }
        .field select option { background: #0e0e0e; }

        .add-btn {
          width: 100%;
          background: #c9a844;
          color: #080808;
          border: none;
          border-radius: 9px;
          padding: 13px;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 4px;
          transition: opacity 0.2s;
        }
        .add-btn:hover { opacity: 0.9; }
        .add-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* TRANSACTIONS */
        .trans-card {
          background: #0e0e0e;
          border: 1px solid #161616;
          border-radius: 16px;
          padding: 28px;
        }

        .trans-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .tabs {
          display: flex;
          gap: 4px;
          background: #080808;
          border: 1px solid #161616;
          border-radius: 8px;
          padding: 4px;
        }
        .tab-btn {
          padding: 6px 14px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: #444;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab-btn.active {
          background: #161616;
          color: #fff;
        }

        .trans-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-height: 500px;
          overflow-y: auto;
        }
        .trans-list::-webkit-scrollbar { width: 3px; }
        .trans-list::-webkit-scrollbar-track { background: transparent; }
        .trans-list::-webkit-scrollbar-thumb { background: #1f1f1f; border-radius: 99px; }

        .trans-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #080808;
          border: 1px solid #141414;
          border-radius: 10px;
          padding: 14px 16px;
          transition: border-color 0.2s;
        }
        .trans-item:hover { border-color: #1f1f1f; }

        .trans-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .trans-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .trans-info {}
        .trans-desc {
          font-size: 14px;
          color: #ddd;
          font-weight: 500;
          margin-bottom: 3px;
        }
        .trans-meta {
          font-size: 11px;
          color: #333;
        }
        .trans-val {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
        }

        .empty {
          text-align: center;
          padding: 48px 0;
          color: #2a2a2a;
          font-size: 14px;
        }

        @media (max-width: 1024px) {
          .grid { grid-template-columns: 1fr; }
          .summary { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="dash">
        <nav className="nav">
          <div className="nav-brand">
            <div className="nav-icon">💰</div>
            <span className="nav-name">FinanceApp</span>
          </div>
          <div className="nav-right">
            <div className="nav-user">Olá, <span>{nome}</span></div>
            <button className="logout-btn" onClick={handleLogout}>Sair</button>
          </div>
        </nav>

        <div className="main">
          <div className="page-header">
            <h1>Dashboard</h1>
            <p>Visão geral das suas finanças</p>
          </div>

          {resumo && (
            <div className="summary">
              <div className="summary-card receitas">
                <div className="summary-label">Total Receitas</div>
                <div className="summary-value">{fmt(resumo.totalReceitas)}</div>
              </div>
              <div className="summary-card despesas">
                <div className="summary-label">Total Despesas</div>
                <div className="summary-value">{fmt(resumo.totalDespesas)}</div>
              </div>
              <div className="summary-card saldo">
                <div className="summary-label">Saldo Atual</div>
                <div className="summary-value">{fmt(resumo.saldo)}</div>
              </div>
            </div>
          )}

          <div className="grid">
            <div className="form-card">
              <div className="card-title">Nova Transação</div>

              <div className="tipo-toggle">
                <button
                  type="button"
                  className={`tipo-btn ${tipo === 'RECEITA' ? 'active-receita' : ''}`}
                  onClick={() => setTipo('RECEITA')}
                >
                  ↑ Receita
                </button>
                <button
                  type="button"
                  className={`tipo-btn ${tipo === 'DESPESA' ? 'active-despesa' : ''}`}
                  onClick={() => setTipo('DESPESA')}
                >
                  ↓ Despesa
                </button>
              </div>

              <form onSubmit={handleAdd}>
                <div className="field">
                  <label>Descrição</label>
                  <input placeholder="Ex: Salário, Aluguel..." value={descricao}
                    onChange={e => setDescricao(e.target.value)} required />
                </div>
                <div className="field">
                  <label>Valor (R$)</label>
                  <input type="number" step="0.01" placeholder="0,00" value={valor}
                    onChange={e => setValor(e.target.value)} required />
                </div>
                <div className="field">
                  <label>Categoria</label>
                  <input placeholder="Ex: Alimentação, Trabalho..." value={categoria}
                    onChange={e => setCategoria(e.target.value)} />
                </div>
                <div className="field">
                  <label>Data</label>
                  <input type="date" value={data}
                    onChange={e => setData(e.target.value)} required />
                </div>
                <button className="add-btn" type="submit" disabled={loading}>
                  {loading ? 'Adicionando...' : '+ Adicionar'}
                </button>
              </form>
            </div>

            <div className="trans-card">
              <div className="trans-header">
                <div className="card-title" style={{ marginBottom: 0 }}>Transações</div>
                <div className="tabs">
                  {['todas', 'receita', 'despesa'].map(t => (
                    <button key={t} className={`tab-btn ${tab === t ? 'active' : ''}`}
                      onClick={() => setTab(t)}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="trans-list">
                {filtradas.length === 0 ? (
                  <div className="empty">Nenhuma transação encontrada.</div>
                ) : (
                  filtradas.map(t => (
                    <div className="trans-item" key={t.id}>
                      <div className="trans-left">
                        <div className="trans-dot" style={{
                          background: t.tipo === 'RECEITA' ? '#34d399' : '#f87171'
                        }} />
                        <div className="trans-info">
                          <div className="trans-desc">{t.descricao}</div>
                          <div className="trans-meta">
                            {t.categoria && `${t.categoria} • `}{t.data}
                          </div>
                        </div>
                      </div>
                      <div className="trans-val" style={{
                        color: t.tipo === 'RECEITA' ? '#34d399' : '#f87171'
                      }}>
                        {t.tipo === 'RECEITA' ? '+' : '-'}{fmt(t.valor)}
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
