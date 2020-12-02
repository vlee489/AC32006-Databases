import Spinner from 'react-bootstrap/Spinner';

const MySpinner = () => (
    <div className="d-flex align-self-center justify-content-center">
        <Spinner animation="border" className="align-items-center" role="status" variant="primary">
            <span className="sr-only">Loading...</span>
        </Spinner>
    </div>
)

export default MySpinner;