interface IProps {
    msg: string
}

const ErrorMsg = ({msg}: IProps) => {
    return (
        msg ? <p className="text-red-600 text-sm font-semibold">{msg}</p> : null  
    )
}

export default ErrorMsg