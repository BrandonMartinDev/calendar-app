// -- == [[ IMPORTS ]] == -- \\

// CSS

import './modal-input-box.css';



// -- == [[ COMPONENTS ]] == -- \\

type ModalInputBoxProps = {

    type: "text" | "textarea" | "date" | "checkbox";
    inputName: string;
    labelText: string;
    value: string | Date | boolean;

    onChange: (e: any) => void

}

const ModalInputBox = ({

    type,
    inputName,
    labelText,
    value,

    onChange

}: ModalInputBoxProps) => {

    let child;

    switch (type) {

        case "text":
            child = (
                <input

                    type="text"
                    id="task-name"
                    name={inputName}

                    value={value.toString()}
                    onChange={onChange}

                />
            )
            break;

        case "textarea":
            child = (
                <textarea

                    id={inputName}
                    name={inputName}

                    value={value.toString()}
                    onChange={onChange}

                />
            )
            break;

        case "date":
            child = (
                <input

                    type="date"
                    id={inputName}
                    name={inputName}

                    value={value.toString()}
                    onChange={onChange}

                />
            )
            break;

        case "checkbox":
            child = (
                <input

                    type="checkbox"
                    id={inputName}
                    name={inputName}

                    checked={value as boolean}
                    onChange={onChange}

                />
            )
            break;

        default:
            throw new Error("Invalid type: " + type);

    }

    return (
        <div className="modal-input-box">
            <label htmlFor={inputName}>{labelText}</label>
            {child}
        </div>
    )

}



// -- == [[ EXPORTS ]] == -- \\

export default ModalInputBox