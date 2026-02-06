import { Button } from 'react-bootstrap';
import '../style/home.css';

function Home() {
    return (
        <>
            <div className='container-1'>
                <h1 className='main-title'>Welcome to the App</h1>
                <div className="btn-group">
                    <Button href="/signup" variant="primary" className='btn-signup' size="lg">Sign In
                    </Button>
                    <Button href="/login" variant="primary" className='btn-login' size="lg">Log In
                    </Button>

                </div>

            </div>
        </>
    )

}
export default Home;