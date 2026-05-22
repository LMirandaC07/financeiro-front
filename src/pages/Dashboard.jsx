import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [resumo, setResumo] = useState(null)
  const [transacoes, setTransacoes] = useState([])
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [tipo, setTipo] = useState('RECEITA')
  const [categoria, setCategoria] = useState('')
  const [data, setData] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const nome = localStorage.getItem('nome')

  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    if (!token) { navigate('/'); return }
    buscarResumo()
    buscarTransacoes()
  }, [])

  async function buscarResumo() {
    const res = await axios.get('http://localhost:8080/api/transacoes/resumo', { headers })
    setResumo(res.data)
  }

  async function buscarTransacoes() {
    const res = await axios.get('http://localhost:8080/api/transacoes', { headers })
    setTransacoes(res.data)
  }

  async function handleAddTransacao(e) {
    e.preventDefault()
    await axios.post('http://localhost:8080/api/transacoes', {
      descricao, valor: parseFloat(valor), tipo, categoria, data
    }, { headers })
    setDescricao(''); setValor(''); setCategoria(''); setData('')
    buscarResumo(); buscarTransacoes()
  }

  function handleLogout() {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h1 style={styles.logo}>💰 FinanceApp</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: '#999', fontSize: 14 }}>Olá, {nome}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>Sair</button>
        </div>
      </div>

      <div style={styles.content}>
        {/* Cards de resumo */}
        {resumo && (
          <div style={styles.cards}>
            <div style={{ ...styles.card, borderColor: '#34d399' }}>
              <p style={styles.cardLabel}>Receitas</p>
              <h2 style={{ ...styles.cardValue, color: '#34d399' }}>
                R$ {resumo.totalReceitas.toFixed(2)}
              </h2>
            </div>
            <div style={{ ...styles.card, borderColor: '#f87171' }}>
              <p style={styles.cardLabel}>Despesas</p>
              <h2 style={{ ...styles.cardValue, color: '#f87171' }}>
                R$ {resumo.totalDespesas.toFixed(2)}
              </h2>
            </div>
            <div style={{ ...styles.card, borderColor: '#b89733' }}>
              <p style={styles.cardLabel}>Saldo</p>
              <h2 style={{ ...styles.cardValue, color: '#b89733' }}>
                R$ {resumo.saldo.toFixed(2)}
              </h2>
            </div>
          </div>
        )}

        <div style={styles.grid}>
          {/* Formulário */}
          <div style={styles.box}>
            <h3 style={styles.boxTitle}>Nova Transação</h3>
            <form onSubmit={handleAddTransacao} style={styles.form}>
              <input style={styles.input} placeholder="Descrição" value={descricao}
                onChange={e => setDescricao(e.target.value)} required />
              <input style={styles.input} placeholder="Valor" type="number"
                step="0.01" value={valor} onChange={e => setValor(e.target.value)} required />
              <input style={styles.input} placeholder="Categoria" value={categoria}
                onChange={e => setCategoria(e.target.value)} />
              <input style={styles.input} type="date" value={data}
                onChange={e => setData(e.target.value)} required />
              <select style={styles.input} value={tipo} onChange={e => setTipo(e.target.value)}>
                <option value="RECEITA">Receita</option>
                <option value="DESPESA">Despesa</option>
              </select>
              <button style={styles.button} type="submit">Adicionar</button>
            </form>
          </div>

          {/* Lista de transações */}
          <div style={styles.box}>
            <h3 style={styles.boxTitle}>Transações</h3>
            <div style={styles.lista}>
              {transacoes.length === 0 && (
                <p style={{ color: '#444', textAlign: 'center', marginTop: 32 }}>
                  Nenhuma transação ainda.
                </p>
              )}
              {transacoes.map(t => (
                <div key={t.id} style={styles.transacaoItem}>
                  <div>
                    <p style={styles.transacaoDesc}>{t.descricao}</p>
                    <p style={styles.transacaoCategoria}>{t.categoria} • {t.data}</p>
                  </div>
                  <span style={{
                    ...styles.transacaoValor,
                    color: t.tipo === 'RECEITA' ? '#34d399' : '#f87171'
                  }}>
                    {t.tipo === 'RECEITA' ? '+' : '-'} R$ {parseFloat(t.valor).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', background: '#0a0a0a', color: '#fff' },
  navbar: {
    background: '#111', borderBottom: '1px solid #1f1f1f',
    padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  },
  logo: { color: '#b89733', fontSize: 22, fontWeight: 900 },
  logoutBtn: {
    background: 'transparent', border: '1px solid #333', color: '#666',
    padding: '6px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 13
  },
  content: { padding: '32px' },
  cards: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 },
  card: {
    background: '#111', border: '1px solid', borderRadius: 12,
    padding: '24px', textAlign: 'center'
  },
  cardLabel: { color: '#555', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 },
  cardValue: { fontSize: 28, fontWeight: 900 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 },
  box: { background: '#111', border: '1px solid #1f1f1f', borderRadius: 12, padding: '24px' },
  boxTitle: { color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 20 },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  input: {
    background: '#0a0a0a', border: '1px solid #222', borderRadius: 8,
    padding: '10px 14px', color: '#fff', fontSize: 13, outline: 'none'
  },
  button: {
    background: '#b89733', color: '#000', border: 'none', borderRadius: 8,
    padding: '12px', fontWeight: 700, fontSize: 14, cursor: 'pointer', marginTop: 4
  },
  lista: { display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 400, overflowY: 'auto' },
  transacaoItem: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 8, padding: '12px 16px'
  },
  transacaoDesc: { color: '#ddd', fontSize: 14, fontWeight: 500, marginBottom: 4 },
  transacaoCategoria: { color: '#444', fontSize: 12 },
  transacaoValor: { fontSize: 15, fontWeight: 700 },
}