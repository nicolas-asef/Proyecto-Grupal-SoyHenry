
export function sumador(){
    let contador = 0
    return () => {contador += 1 ;return contador}
}