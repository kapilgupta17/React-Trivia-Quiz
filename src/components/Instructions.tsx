type Props = {
    label: string
}

export function toggleModal(id: string) {
    const modal = document.getElementById(id) as HTMLDialogElement;
    const modalOpen = modal.open;
    if (modal) {
        if (modalOpen) {
            modal.close();
        }
        else if (!modalOpen) {
            modal.showModal()
        }
    }
}

export default function Instructions({ label }: Props) {
    return (
        <>
            <dialog id={label}>

                <h2>How to Play?</h2>
                <ul>
                    <li>Choose a category</li>
                    <li>Choose the number of questions</li>
                    <li>Choose a difficulty level</li>
                    <li>Answer the MCQs as accurately as possible</li>
                    <li>No timer, So take your time and have fun :)</li>
                    <li>Press <span>Start Game</span></li>

                </ul>
                <button onClick={() => toggleModal(label)}>Close</button>
            </dialog>
        </>
    );
}