import axios from 'axios'
import './App.css';
import Patients from "./components/Patients";
import Pagination from "./components/Pagination";
import React, {useState, useEffect} from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-phone-number-input/style.css'


function App() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const resp = await axios.get("http://localhost:8000/patients/")
            setPosts(resp.data)
            setLoading(false)
        }
        fetchPosts();
    }, []);

    function setFN(event) {
        setFirstName(event.target.value);
    }

    function setLN(event) {
        setLastName(event.target.value);
    }

    function setGenders(event) {
        setGender(event.target.value);
    }

    function setPhone(event) {
        setPhoneNumber('+91' + event.target.value);
    }

    function handleOnSubmit(event) {
        const patientData = {
            "first_name": firstName,
            "last_name": lastName,
            "gender": gender,
            "phone": phoneNumber
        }
        const resp = axios.post("http://localhost:8000/patients/", patientData)
        console.log(resp)
    }


    //Get current Post
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    //Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div>
            <div className="container mt-5">
                <form onSubmit={handleOnSubmit}>
                    <h3>Add New patient</h3>
                    <div className={"row"}>
                        <div className={"col-sm-2"}>
                            <p>First Name:</p>
                            <input
                                type='text'
                                onChange={setFN}
                                required
                            />
                        </div>
                        <div className={"col-sm-1"}></div>
                        <div className={"col-sm-2"}>
                            <p>Last Name:</p>
                            <input
                                type='text'
                                onChange={setLN}
                            />
                        </div>
                        <div className={"col-sm-1"}></div>
                        <div className={"col-sm-1"}>
                            <p>Gender:</p>
                            <select style={{height: 30, textAlign: "left", marginRight: 5}}
                                    onChange={setGenders}
                                    required
                            >
                                <option value="">None</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className={"col-sm-1"}></div>
                        <div className={"col-sm-2"}>
                            <p>Phone no:</p>
                            <input type="tel" id="phone" name="phone" onChange={setPhone}
                                   pattern="[1-9]{1}[0-9]{9}"
                                   required/>
                            <small>Format: 1234567890</small>
                        </div>
                        <div className={"col-sm-1"}></div>
                        <div className={"col-sm-1"}>
                            <button style={{marginTop: 37}} type="submit">Submit</button>
                        </div>

                    </div>

                </form>
            </div>
            <div className="container mt-5">
                <h1 className="text-primary mb-3"> Patients List </h1>
                <Patients posts={currentPosts} loading={loading}/>
                <Pagination postPerPage={postPerPage} totalPosts={posts.length} paginate={paginate}/>
            </div>
        </div>
    );
}

export default App;