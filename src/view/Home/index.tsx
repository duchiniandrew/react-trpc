import { useEffect, useState } from "react";
import { trpc } from "../../trpc";
import { User } from "../../../../nest-trpc/src/modules/users/types";

let cont = 0;

export function Home() {
    const [usersList, setUsersList] = useState<User[]>([]);
    const [newUserName, setNewUserName] = useState<string>("");
    const [newUserEmail, setNewUserEmail] = useState<string>("");
    const [newUserPassword, setNewUserPassword] = useState<string>("");
    const [userDeleteId, setUserDeleteId] = useState<number>();

    useEffect(() => {
        refresh()
    }, [])

    function refresh() {
        trpc.listUsers.query().then(result => {
            setUsersList(result);
        })
    }

    function clearInputs() {
        setNewUserName("")
        setUserDeleteId(undefined)
    }

    return (
        <div>
            <p>Users:</p>
            <div>
                <input onChange={e => setUserDeleteId(parseInt(e.target.value))} value={userDeleteId} type="number" placeholder="User id" />
                <button onClick={() => {
                    if (userDeleteId) {
                        trpc.deleteUser.query({
                            id: userDeleteId,
                        }).then(result => {
                            refresh();
                            clearInputs()
                        })
                    }
                }}>Delete User</button>
            </div>
            <div>
                <input onChange={e => setNewUserName(e.target.value)} value={newUserName} type="text" placeholder="User name" />
                <input onChange={e => setNewUserEmail(e.target.value)} value={newUserName} type="text" placeholder="User email" />
                <input onChange={e => setNewUserPassword(e.target.value)} value={newUserName} type="text" placeholder="User password" />

                <button onClick={() => {
                    trpc.createUser.query({
                        name: newUserName,
                        email: newUserEmail,
                        password: newUserPassword,
                    }).then(result => {
                        refresh();
                        clearInputs()
                        cont++;
                    })
                }}>Create User</button>
            </div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
                {usersList.map(user => (
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.name} </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}