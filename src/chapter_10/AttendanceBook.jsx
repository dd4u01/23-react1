import React from "react";

const students = [
    {
        id: 1,
        name: "Amy",
    },
    {
        id: 2,
        name: "Brian",
    },
    {
        id: 3,
        name: "Catherine",
    },
    {
        id: 4,
        name: "Diana",
    },
];

function AttendanceBook(props) {
    return (
        <ul>
            {
            students.map((student) => {
                return <li key={student.id}>{student.name}</li>
            })
            }
        </ul>
    )
}

export default AttendanceBook;