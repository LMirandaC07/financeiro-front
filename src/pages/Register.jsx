/* ========================= REGISTER.JSX ========================= */

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
      const res = await axios.post(`${API}/api/auth/register`, {
        nome,
        email,
        senha
      })

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
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: #f5f7fb;
        }

        .auth-page {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(to bottom right, #f5f7fb, #eef2ff);
        }

        .auth-left {
          flex: 1;
          padding: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 60px;
        }

        .brand-icon {
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, #d4af37, #f5d76e);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #111827;
        }

        .hero-text h1 {
          font-family: 'Syne', sans-serif;
          font-size: 64px;
          line-height: 1.05;
          color: #111827;
          margin-bottom: 20px;
        }

        .hero-text span {
          color: #d4af37;
        }

        .hero-text p {
          max-width: 500px;
          color: #6b7280;
          font-size: 17px;
          line-height: 1.7;
        }

        .steps {
          margin-top: 50px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .step {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .step-num {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(212,175,55,0.12);
          color: #d4af37;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .step-text {
          color: #4b5563;
        }

        .auth-right {
          width: 480px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(10px);
          border-left: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 50px;
          box-shadow: -10px 0 30px rgba(0,0,0,0.03);
        }

        .form-title {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #111827;
          margin-bottom: 8px;
        }

        .form-sub {
          color: #6b7280;
          margin-bottom: 35px;
        }

        .field {
          margin-bottom: 18px;
        }

        .field label {
          display: block;
          margin-bottom: 8px;
          font-size: 13px;
          color: #374151;
          font-weight: 600;
        }

        .field input {
          width: 100%;
          padding: 15px;
          border-radius: 12px;
          border: 1px solid #d1d5db;
          background: #f9fafb;
          font-size: 14px;
          outline: none;
          transition: 0.2s;
        }

        .field input:focus {
          border-color: #d4af37;
          background: white;
        }

        .submit-btn {
          width: 100%;
          border: none;
          border-radius: 12px;
          padding: 15px;
          background: linear-gradient(135deg, #d4af37, #f5d76e);
          color: #111827;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          margin-top: 10px;
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .erro-msg {
          background: #fee2e2;
          color: #dc2626;
          padding: 14px;
          border-radius: 10px;
          margin-bottom: 18px;
          font-size: 14px;
        }

        .form-footer {
          margin-top: 22px;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }

        .form-footer a {
          color: #d4af37;
          text-decoration: none;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .auth-left {
            display: none;
          }

          .auth-right {
            width: 100%;
          }
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-left">
          <div className="brand">
            <div className="brand-icon">💰</div>
            <div className="brand-name">FinanceApp</div>
          </div>

          <div className="hero-text">
            <h1>
              Comece a <br />
              <span>controlar</span> <br />
              hoje mesmo.
            </h1>

            <p>
              Crie sua conta gratuitamente e tenha uma visão completa das suas
              finanças em tempo real.
            </p>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <div className="step-text">Crie sua conta em segundos</div>
            </div>

            <div className="step">
              <div className="step-num">2</div>
              <div className="step-text">Adicione receitas e despesas</div>
            </div>

            <div className="step">
              <div className="step-num">3</div>
              <div className="step-text">Acompanhe sua evolução financeira</div>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="form-title">Criar conta grátis</div>
          <div className="form-sub">
            Leva menos de 1 minuto
          </div>

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

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
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