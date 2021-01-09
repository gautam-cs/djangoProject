import React from 'react'

const Patients = ({posts, loading}) => {
    if (loading) {
        return <h2>loading........</h2>
    }
    return (
        <div className="container">
            <div className="row">
                <table className='table table-striped'>
                    <thead>
                    <tr>
                        <th>Patient Id</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Phone</th>
                    </tr>
                    </thead>
                    {posts.map(post => (
                        <tbody>
                        <tr>
                            <td> {post.id}</td>
                            <td> {post.first_name}</td>
                            <td> {post.gender}</td>
                            <td> {post.phone}</td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>

        </div>)
        ;
}
export default Patients