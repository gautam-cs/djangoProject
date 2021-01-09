import axios from 'axios'
import './App.css';
import Patients from "./components/Patients";
import Pagination from "./components/Pagination";
import React, {useState, useEffect} from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);


    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const resp = await axios.get("http://localhost:8000/patients/")
            setPosts(resp.data)
            setLoading(false)
        }
        fetchPosts();
    }, []);

    function myChangeHandler(event) {
        this.setState({username: event.target.value});
    }
    function handleOnSubmit(event) {
        console.log("hello")
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
                    <h3>Submit New patient Details</h3>
                    <div className={"row"}>
                        <div className={"col-sm-2"}>
                            <p>First Name:</p>
                            <input
                                type='text'
                                onChange={myChangeHandler}
                            />
                        </div>
                        <div className={"col-sm-1"}></div>
                        <div className={"col-sm-2"}>
                            <p>Last Name:</p>
                            <input
                                type='text'
                                onChange={myChangeHandler}
                            />
                        </div>
                        <div className={"col-sm-1"}></div>
                        <div className={"col-sm-2"}>
                            <p>Gender:</p>
                            <input
                                type='text'
                                onChange={myChangeHandler}
                            />
                        </div>
                        <div className={"col-sm-1"}></div>
                        <div className={"col-sm-2"}>
                            <p>Phone no:</p>
                            <input
                                type='text'
                                onChange={myChangeHandler}
                            />
                        </div>
                    </div>
                    <button type="submit">Submit</button>
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