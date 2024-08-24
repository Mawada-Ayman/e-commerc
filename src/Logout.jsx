import { useEffect } from "react";


export default function Logout() {
  useEffect(() => {
    document.title = 'LogOut Page';
  }, []);
  return (
    <div>Logout</div>
  )
}

