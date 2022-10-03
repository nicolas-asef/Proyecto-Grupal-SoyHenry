export default function Pagination ({callbk, cantWorkers}){
    let paginas = []
    for (let i = 0; i < Math.ceil(cantWorkers / 4); i++) {
        paginas.push(i+1)
    }

    return (
        <ul>
            {paginas.map(pagina => {
                return (
                    <li key={pagina} onClick={() => callbk(pagina)}>
                        <a>{pagina}</a>
                    </li>
                )
            })}
        </ul>
    )
}