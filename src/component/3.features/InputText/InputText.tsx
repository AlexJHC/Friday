import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useState} from 'react'
import style from './InputText.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    password?: boolean
}

const InputText: React.FC<SuperInputTextPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,
        password,
        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {

    // password functionality
    const [passwordToggle, setPassword] = useState<boolean>(false)

    const passwordToggleHandler = () => {
        setPassword(!passwordToggle)
        setTimeout(() => {
            setPassword(false)
        }, 7000)
    }

    const eyeImg =
        <svg className={style.eye}
             onClick={passwordToggleHandler}
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17
            4.5 12 4.5ZM12 17C9.23997 17 6.99997 14.76 6.99997 12C6.99997 9.24 9.23997 6.99999 12 6.99999C14.76 6.99999
            17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 8.99997 10.34 8.99997 12C8.99997 13.66
            10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
                  fill="#2D2E46"/>
        </svg>

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e) // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter // если есть пропс onEnter
        && e.key === 'Enter' // и если нажата кнопка Enter
        && onEnter() // то вызвать его
    }

    const finalSpanClassName = `${style.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${style.errorInput} ${className ? className : style.superInput}`

    if (password) {
        return (
            <div className={style.passwordWrapper}>
                <input
                    type={passwordToggle ? 'text' : 'password'}
                    onChange={onChangeCallback}
                    onKeyPress={onKeyPressCallback}
                    className={finalInputClassName}
                    maxLength={15}
                    {...restProps}
                />
                {error && <span className={finalSpanClassName}>{error}</span>}
                {eyeImg}
            </div>
        )
    } else {
        return (
            <div className={style.passwordWrapper}>
                <input
                    type={'text'}
                    onChange={onChangeCallback}
                    onKeyPress={onKeyPressCallback}
                    className={finalInputClassName}
                    {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                />
                {error && <span className={finalSpanClassName}>{error}</span>}
            </div>
        )
    }
}

export default InputText
