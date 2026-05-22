import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', { email, senha })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('nome', res.data.nome)
      navigate('/dashboard')
    } catch (err) {
      setErro('Email ou senha incorretos!')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>💰 FinanceApp</h1>
        <h2 style={styles.subtitle}>Entrar na conta</h2>

        {erro && <p style={styles.erro}>{erro}</p>}

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />
          <button style={styles.button} type="submit">Entrar</button>
        </form>

        <p style={styles.link}>
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0f0f0f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: 16,
    padding: '48px 40px',
    width: '100%',
    maxWidth: 400,
  },
  title: {
    color: '#b89733',
    fontSize: 28,
    fontWeight: 900,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  input: {
    background: '#111',
    border: '1px solid #333',
    borderRadius: 8,
    padding: '12px 16px',
    color: '#fff',
    fontSize: 14,
    outline: 'none',
  },
  button: {
    background: '#b89733',
    color: '#000',
    border: 'none',
    borderRadius: 8,
    padding: '14px',
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    marginTop: 8,
  },
  erro: {
    color: '#ff4444',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },
  link: {
    color: '#666',
    textAlign: 'center',
    marginTop: 24,
    fontSize: 14,
  },
}