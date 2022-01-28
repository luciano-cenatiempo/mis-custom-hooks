import React, { useEffect, useRef, useState } from 'react'

export const useFetch = (url) => {


    const isMounted = useRef(true); // para mantener la referencia de que esta montado y evitar errores por desmonte
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {

        return () => {
            isMounted.current = false; // la referencia pasa a ser falsa osea que se desmontó
        }
    }, []) // se pone el useEffect para ver la variacion

    useEffect(() => {
        setState({ data: null, loading: true, error: null })//esta linea es para que haga el loading cada vez que pongo next quote

        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                if (isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data
                    }) // si esta montado el componente hace el setState, sino no lo hace (evitandonos un error)
                }
            })
            .catch(()=>{
                setState({
                    data: null,
                    loading:false,
                    error: 'No se pudo cargar la info'
    
                })
            })
    }, [url]);

    return state;

}
