import React from "react";
import { observer } from "mobx-react";
import { useStore } from "../setupContext";
import { UserStore } from "../store/users";
import { User } from "./user";

const Main: React.FunctionComponent<{ users: UserStore }> = ({ users }) => {
    return (
        <ul>
            {users.users.map((value: any, index) => {
                return <User {...{ user: value }}></User>
                // return <li key={index}>{value.age}</li>
            })}
        </ul>
        // <div>{users.users.length}</div>
    )
};

const Observed = observer(Main);
const WithStore: React.FunctionComponent = () => {
    const { users } = useStore();
    return (<Observed {...{ users: users }}></Observed >);
}

export default observer(WithStore);