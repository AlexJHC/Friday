import style from './Spinner.module.css'

const Spinner = () => {
    return (
        <div>
            <svg className={style.spinner} viewBox="0 0 100 100" width="80" height="80">
                <circle cx="50" cy="50" r="42" transform="rotate(-90,50,50)"/>
            </svg>
        </div>
    )
}

export default Spinner