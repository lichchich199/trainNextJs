import Link from "next/link"
import { Layout } from "../components/Layout"

const NotFoundPage = () => {
    return <>
        <Layout>
            <h1>404 - Page Not Found</h1>
            <Link href="/contact/list">
                Go back list
            </Link>
        </Layout>
    </> 
}

export default NotFoundPage