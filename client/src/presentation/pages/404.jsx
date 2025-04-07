import React from "react";
import { Link } from "react-router-dom";
import './css/404.css'

export const Page404 = () => {
    return (
        <div className="app-404">
            <div className="contenido-404">
                <h1>404</h1>
                <h2>Page not found</h2>
                <Link to="/Home">
                    <button>Volver al Home</button>
                </Link>
            </div>
        </div>
    )
}

