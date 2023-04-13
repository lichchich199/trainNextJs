import Link from 'next/link'
import  style from '../styles/Header.module.css';
import useUser from '../lib/useUser'
import { useRouter } from 'next/router'
import fetchJson from '../lib/fetchJson';


export default function Header() {
    const { data, mutate } = useUser({})
    const router = useRouter()
    return (
        <header className={style.headerHeader}>
        <nav>
            <ul className={style.ulHeader}>
            <li className={style.liHeader}>
                <Link href="/" legacyBehavior>
                <a>Home</a>
                </Link>
            </li>
            <li className={style.liHeader}>
                <a href="/api/logout" 
                    onClick={async (e) => {
                        e.preventDefault()
                        mutate(
                            await fetchJson('/api/logout', {
                                method: 'POST'
                            }),
                            false
                        )
                        router.push('/account/login')
                    }}
                >
                <p>{data?.isLoggedIn ? 'Logout' : 'Login'}</p>
                </a>
            </li>
            </ul>
        </nav>
        </header>
    )
    }
