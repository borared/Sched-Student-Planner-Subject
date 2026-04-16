import Auth from "../components/Authentication/Auth";

export default function Authentication({ onLogin }) {
    return (
        <Auth onLogin={onLogin} />
    );
}