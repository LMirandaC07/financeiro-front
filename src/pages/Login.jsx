import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const API = 'https://financeiro-api-production.up.railway.app'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setErro('')
    try {
      const res = await axios.post(`${API}/api/auth/login`, { email, senha })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('nome', res.data.nome)
      navigate('/dashboard')
    } catch {
      setErro('Email ou senha incorretos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080808; }

        .auth-page {
          min-height: 100vh;
          background: #080808;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          position: relative;
        }

        .auth-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px;
          position: relative;
          z-index: 1;
        }

        .auth-right {
          width: 480px;
          background: #0e0e0e;
          border-left: 1px solid #1a1a1a;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 56px;
          position: relative;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }
        .orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #c9a84420 0%, transparent 70%);
          top: -100px; left: -100px;
        }
        .orb-2 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #c9a84410 0%, transparent 70%);
          bottom: 100px; right: 200px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 64px;
        }
        .brand-icon {
          width: 40px; height: 40px;
          background: #c9a844;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
        }
        .brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.3px;
        }

        .hero-text h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(42px, 5vw, 64px);
          font-weight: 800;
          color: #fff;
          line-height: 1.05;
          letter-spacing: -2px;
          margin-bottom: 20px;
        }
        .hero-text h1 span { color: #c9a844; }
        .hero-text p {
          color: #444;
          font-size: 16px;
          line-height: 1.7;
          max-width: 400px;
        }

        .stats {
          display: flex;
          gap: 48px;
          margin-top: 64px;
          padding-top: 40px;
          border-top: 1px solid #161616;
        }
        .stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #c9a844;
        }
        .stat-label {
          font-size: 12px;
          color: #333;
          margin-top: 4px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .form-title {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
        }
        .form-sub {
          color: #444;
          font-size: 14px;
          margin-bottom: 40px;
        }

        .field {
          margin-bottom: 16px;
        }
        .field label {
          display: block;
          font-size: 12px;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }
        .field input {
          width: 100%;
          background: #080808;
          border: 1px solid #1f1f1f;
          border-radius: 10px;
          padding: 14px 16px;
          color: #fff;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s;
        }
        .field input:focus { border-color: #c9a844; }
        .field input::placeholder { color: #333; }

        .submit-btn {
          width: 100%;
          background: #c9a844;
          color: #080808;
          border: none;
          border-radius: 10px;
          padding: 15px;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 8px;
          transition: opacity 0.2s, transform 0.1s;
          letter-spacing: 0.3px;
        }
        .submit-btn:hover { opacity: 0.9; }
        .submit-btn:active { transform: scale(0.99); }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .erro-msg {
          background: #ff444415;
          border: 1px solid #ff444430;
          border-radius: 8px;
          padding: 12px 16px;
          color: #ff6b6b;
          font-size: 13px;
          margin-bottom: 20px;
        }

        .form-footer {
          text-align: center;
          margin-top: 24px;
          font-size: 13px;
          color: #444;
        }
        .form-footer a {
          color: #c9a844;
          text-decoration: none;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .auth-left { display: none; }
          .auth-right { width: 100%; padding: 40px 28px; border: none; }
        }
      `}</style>

      <div className="auth-page">
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="auth-left">
          <div className="brand">
            <div className="brand-icon">💰</div>
            <span className="brand-name">FinanceApp</span>
          </div>

          <div className="hero-text">
            <h1>Controle seu<br /><span>dinheiro</span><br />com clareza.</h1>
            <p>Registre receitas e despesas, acompanhe seu saldo e tome decisões financeiras mais inteligentes.</p>
          </div>

          <div className="stats">
            <div>
              <div className="stat-value">100%</div>
              <div className="stat-label">Gratuito</div>
            </div>
            <div>
              <div className="stat-value">JWT</div>
              <div className="stat-label">Seguro</div>
            </div>
            <div>
              <div className="stat-value">∞</div>
              <div className="stat-label">Transações</div>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="form-title">Bem-vindo de volta</div>
          <div className="form-sub">Entre com sua conta para continuar</div>

          {erro && <div className="erro-msg">{erro}</div>}

          <form onSubmit={handleLogin}>
            <div className="field">
              <label>Email</label>
              <input type="email" placeholder="seu@email.com" value={email}
                onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="field">
              <label>Senha</label>
              <input type="password" placeholder="••••••••" value={senha}
                onChange={e => setSenha(e.target.value)} required />
            </div>
            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="form-footer">
            Não tem conta? <Link to="/register">Criar conta grátis</Link>
          </div>
        </div>
      </div>
    </>
  )
}
