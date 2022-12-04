import { Link } from "react-router-dom";

function Pagenotfound() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            minHeight: 'calc(100vh - 220px)',
            color: 'var(--txt)',
            flexDirection: "column",
            fontWeight: '600'
        }}>
            <i className="fa-solid fa-robot" style={{ fontSize: '40px', marginBottom: '20px', color: 'var(--btn)' }}></i>

            Oops! Page not found!

            <Link to='/home' style={{ textDecoration: 'underline', marginTop: '20px' }}>
                <button style={{
                    padding: '16px 24px',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    border: '2px solid transparent',
                    outline: 'none',
                    cursor: 'pointer',
                    background: 'var(--btn)',
                    color: 'var(--txt)',
                }}>
                    Back to Login
                </button>
            </Link>
        </div>
    )
}

export default Pagenotfound;