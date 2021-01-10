import React, {useState} from 'react'
import axios from "axios";

const Patients = ({posts, loading}) => {
    if (loading) {
        return <h2>loading........</h2>
    }

    function removeRow(id) {
        // const resp = axios.delete("http://localhost:8000/patient/" + id + "/")
        console.log('del',id)
    }

    function editRow(id) {
        // const resp = axios.put("http://localhost:8000/patient/" + id + "/", data={})
        console.log('edit',id)
    }

    return (
        <div className="container">
            <div className="row">
                <table className='table table-striped'>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    {posts.map(post => (
                        <tbody>
                        <tr>
                            <td> {post.first_name} {post.last_name}</td>
                            <td> {post.gender}</td>
                            <td> {post.phone}</td>
                            <td>
                                <button className="btn-info glyphicon glyphicon-pencil" style={{
                                    width: 40,
                                    height: 30,
                                    textAlign: "center",
                                    padding: 6,
                                    fontSize: 12,
                                    lineHeight: 1.42,
                                    borderRadius: 15
                                }} onClick={editRow(post.id)}>Edit
                                </button>
                            </td>
                            <td>
                                <button className="btn-info glyphicon glyphicon-pencil" style={{
                                    width: 60,
                                    height: 30,
                                    textAlign: "center",
                                    padding: 6,
                                    fontSize: 12,
                                    lineHeight: 1.42,
                                    borderRadius: 15,
                                    borderWidth:0,
                                    backgroundColor: "#f44336"
                                }} onClick={removeRow(post.id)}>Delete
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>

        </div>)
        ;
}
export default Patients