import React from 'react'

export function SortDescending(): JSX.Element {
	return (
		<svg width="12" height="5" viewBox="0 0 12 5" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4.81818 3C4.96285 3 5.10158 2.94732 5.20388 2.85355C5.30617 2.75979 5.36364 2.63261 5.36364 2.5C5.36364 2.36739 5.30617 2.24021 5.20388 2.14645C5.10158 2.05268 4.96285 2 4.81818 2H0.545455C0.400791 2 0.262052 2.05268 0.15976 2.14645C0.0574673 2.24021 0 2.36739 0 2.5C0 2.63261 0.0574673 2.75979 0.15976 2.85355C0.262052 2.94732 0.400791 3 0.545455 3H4.81818ZM6.45455 1C6.59921 1 6.73795 0.947321 6.84024 0.853553C6.94253 0.759785 7 0.632608 7 0.5C7 0.367391 6.94253 0.240214 6.84024 0.146446C6.73795 0.052678 6.59921 0 6.45455 0H0.545455C0.400791 0 0.262052 0.052678 0.15976 0.146446C0.0574673 0.240214 0 0.367391 0 0.5C0 0.632608 0.0574673 0.759785 0.15976 0.853553C0.262052 0.947321 0.400791 1 0.545455 1H6.45455ZM3.18182 5C3.32648 5 3.46522 4.94732 3.56751 4.85355C3.66981 4.75979 3.72727 4.63261 3.72727 4.5C3.72727 4.36739 3.66981 4.24021 3.56751 4.14645C3.46522 4.05268 3.32648 4 3.18182 4H0.545455C0.400791 4 0.262052 4.05268 0.15976 4.14645C0.0574673 4.24021 0 4.36739 0 4.5C0 4.63261 0.0574673 4.75979 0.15976 4.85355C0.262052 4.94732 0.400791 5 0.545455 5H3.18182Z"
				fill="#141517"
			/>
		</svg>
	)
}

export function SortAscending(): JSX.Element {
	return (
		<svg width="12" height="5" viewBox="0 0 12 5" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4.81818 2C4.96285 2 5.10158 2.05268 5.20388 2.14645C5.30617 2.24021 5.36364 2.36739 5.36364 2.5C5.36364 2.63261 5.30617 2.75979 5.20388 2.85355C5.10158 2.94732 4.96285 3 4.81818 3H0.545455C0.400791 3 0.262052 2.94732 0.15976 2.85355C0.0574673 2.75979 0 2.63261 0 2.5C0 2.36739 0.0574673 2.24021 0.15976 2.14645C0.262052 2.05268 0.400791 2 0.545455 2H4.81818ZM6.45455 4C6.59921 4 6.73795 4.05268 6.84024 4.14645C6.94253 4.24021 7 4.36739 7 4.5C7 4.63261 6.94253 4.75979 6.84024 4.85355C6.73795 4.94732 6.59921 5 6.45455 5H0.545455C0.400791 5 0.262052 4.94732 0.15976 4.85355C0.0574673 4.75979 0 4.63261 0 4.5C0 4.36739 0.0574673 4.24021 0.15976 4.14645C0.262052 4.05268 0.400791 4 0.545455 4H6.45455ZM3.18182 0C3.32648 0 3.46522 0.0526785 3.56751 0.146447C3.66981 0.240215 3.72727 0.367392 3.72727 0.5C3.72727 0.632608 3.66981 0.759785 3.56751 0.853553C3.46522 0.947321 3.32648 1 3.18182 1H0.545455C0.400791 1 0.262052 0.947321 0.15976 0.853553C0.0574673 0.759785 0 0.632608 0 0.5C0 0.367392 0.0574673 0.240215 0.15976 0.146447C0.262052 0.0526785 0.400791 0 0.545455 0H3.18182Z"
				fill="#141517"
			/>
		</svg>
	)
}

export function SortDisabled(): JSX.Element {
	return (
		<svg width="12" height="5" viewBox="0 0 12 5" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g opacity="0.3">
				<path
					d="M4.81818 3C4.96285 3 5.10158 2.94732 5.20388 2.85355C5.30617 2.75979 5.36364 2.63261 5.36364 2.5C5.36364 2.36739 5.30617 2.24021 5.20388 2.14645C5.10158 2.05268 4.96285 2 4.81818 2H0.545455C0.400791 2 0.262052 2.05268 0.15976 2.14645C0.0574673 2.24021 0 2.36739 0 2.5C0 2.63261 0.0574673 2.75979 0.15976 2.85355C0.262052 2.94732 0.400791 3 0.545455 3H4.81818ZM6.45455 1C6.59921 1 6.73795 0.947321 6.84024 0.853553C6.94253 0.759785 7 0.632608 7 0.5C7 0.367391 6.94253 0.240214 6.84024 0.146446C6.73795 0.0526781 6.59921 0 6.45455 0H0.545455C0.400791 0 0.262052 0.0526781 0.15976 0.146446C0.0574673 0.240214 0 0.367391 0 0.5C0 0.632608 0.0574673 0.759785 0.15976 0.853553C0.262052 0.947321 0.400791 1 0.545455 1H6.45455ZM3.18182 5C3.32648 5 3.46522 4.94732 3.56751 4.85355C3.66981 4.75979 3.72727 4.63261 3.72727 4.5C3.72727 4.36739 3.66981 4.24021 3.56751 4.14645C3.46522 4.05268 3.32648 4 3.18182 4H0.545455C0.400791 4 0.262052 4.05268 0.15976 4.14645C0.0574673 4.24021 0 4.36739 0 4.5C0 4.63261 0.0574673 4.75979 0.15976 4.85355C0.262052 4.94732 0.400791 5 0.545455 5H3.18182Z"
					fill="#141517"
				/>
			</g>
		</svg>
	)
}
