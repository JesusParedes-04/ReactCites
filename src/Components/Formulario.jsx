import { useState, useEffect } from "react"
import Error from "./Error"


const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
    //Console.log muestra resultado en consola, el setnombre te lo muestra en react

    const [nombre, setNombre] = useState('') //Valor inicial
    const [email, setEmail] = useState('') //Valor inicial
    const [fecha, setFecha] = useState('') //Valor inicial
    const [sintomas, setSintomas] = useState('') //Valor inicial
    const [error, setError] = useState(false)

useEffect(()=>{
//Comprobar si un arreglo esta vacio
if(Object.keys(paciente).length>0){
 setNombre(paciente.nombre)
 setEmail(paciente.email)
 setFecha(paciente.fecha)
 setSintomas(paciente.sintomas)
}

},[paciente])

    const generarID = () => {
        const random = Math.random().toString(36).substring(2)
        const fecha = Date.now().toString(36)

        return random + fecha

    }

    //Validacion formulario

    // No se puede crear un useState dentro de un if o después de un return, pero si se puede acceder a sus variables por medio de un array.


    const handleSubmit = (e) => {
        e.preventDefault();
        if ([nombre, email, fecha, sintomas].includes(''))  //Generamos el arreglo para tener acceso al "includes"
        {
            console.log('Hay al menos un campo vacio')
            setError(true)
            return;
        }
        setError(false)

        // objeto de paciente

        const objetoPaciente = {
            nombre,
            email,
            fecha,
            sintomas,
        }


        if(paciente.id) {
            //editando el registro
            objetoPaciente.id = paciente.id
            console.log('editando')


const pacientesActualizados = pacientes.map(pacienteState=>pacienteState.id === paciente.id? objetoPaciente: pacienteState)
setPacientes(pacientesActualizados)
setPaciente({})

        } else {
            //Nuevo registro
            objetoPaciente.id = generarID()
            setPacientes([...pacientes, objetoPaciente])

        }


        //reiniciar el formulario

        setNombre('')
        setEmail('')
        setFecha('')
        setSintomas('')

    }

    return (

        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento
                Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span> </p>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">


                {error &&

                    <Error>

                        <p>
                            Todos los campos son obligatorios
                        </p>

                    </Error>

                }

                {/* 
                {

                    error && <Error>
                        <p>Todos los campos son obligatorios</p>

                    </Error>} */}

                <div className="mb-5">
                    <label htmlFor="paciente" className="block text-grey-700 uppercarse font-bold">Nombre Paciente</label>

                    <input
                        id="paciente"
                        type="text"
                        placeholder="Nombre de la Paciente"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-grey-700 uppercarse font-bold">Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email Contacto"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="alta" className="block text-grey-700 uppercarse font-bold">Alta</label>

                    <input
                        id="alta"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-grey-700 uppercarse font-bold">Sintomas</label>

                    <textarea
                        id="sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Describe los Síntomas"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    />
                </div>


                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
                    value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
                />


            </form>

        </div>
    )


}


export default Formulario