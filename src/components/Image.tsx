interface IProps {
    url: string
    alt: string
    className: string

}

const Image = ({url, alt, className}: IProps) => {
    return (
        <img 
            src={url} 
            className={className}
            alt={alt}
        />
    )
}

export default Image