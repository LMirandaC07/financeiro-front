import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const API = 'https://financeiro-api-production-aa9b.up.railway.app'

export default function Register() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault()
    setLoading(true)
    setErro('')
    try {
      const res = await axios.post(`${API}/api/auth/register`, { nome, email, senha })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('nome', res.data.nome)
      navigate('/dashboard')
    } catch {
      setErro('Email já cadastrado ou erro ao criar conta.')
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
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #c9a84420 0%, transparent 70%);
          top: -100px;
          left: -100px;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 64px;
        }

        .brand-icon {
          width: 40px;
          height: 40px;
          background: #c9a844;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        .brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #fff;
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

        .hero-text h1 span {
          color: #c9a844;
        }

        .hero-text p {
          color: #444;
          font-size: 16px;
          line-height: 1.7;
          max-width: 400px;
        }

        .steps {
          margin-top: 64px;
          padding-top: 40px;
          border-top: 1px solid #161616;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .step {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .step-num {
          width: 32px;
          height: 32px;
          border: 1px solid #c9a84440;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          color: #c9a844;
          flex-shrink: 0;
        }
        .step-text { color: #444; font-size: 14px; }

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

        .field { margin-bottom: 16px; }
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

        .field input:focus {
          border-color: #c9a844;
        }

        .field input::placeholder {
          color: #333;
        }

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
          transition: opacity 0.2s;
        }

        .submit-btn:hover {
          opacity: 0.9;
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

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
          .auth-left {
            display: none;
          }
          .auth-right {
            width: 100%;
            padding: 40px 28px;
            border: none;
          }
        }
      `}</style>

      <div className="auth-page">
        <div className="orb orb-1" />

        <div className="auth-left">
          <div className="brand">
            <div className="brand-icon">💰</div>
            <span className="brand-name">FinanceApp</span>
          </div>

          <div className="hero-text">
            <h1>Comece a<br /><span>controlar</span><br />hoje mesmo.</h1>
            <p>Crie sua conta gratuitamente e tenha visibilidade total sobre suas finanças pessoais.</p>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <div className="step-text">Crie sua conta em segundos</div>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <div className="step-text">Registre receitas e despesas</div>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <div className="step-text">Acompanhe seu saldo em tempo real</div>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="form-title">Criar conta grátis</div>
          <div className="form-sub">Leva menos de 1 minuto</div>

          {erro && <div className="erro-msg">{erro}</div>}

          <form onSubmit={handleRegister}>
            <div className="field">
              <label>Nome completo</label>
              <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label>Senha</label>
              <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
              />
            </div>
            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? 'Criando conta...' : 'Criar conta grátis'}
            </button>
          </form>

          <div className="form-footer">
            Já tem conta? <Link to="/">Entrar</Link>
          </div>
        </div>
      </div>
    </>
  )
}
