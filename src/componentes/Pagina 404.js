import React from 'react';

import Foto from '../imagenes/404.jpg';

class PaginaNotFound extends React.Component {
	render() {
		return (
			<div style={{ background: "black" }}>
				<div >
					<img src={Foto} alt="" width="1200px" height="641px" />
					<br />
					<div style={{paddingLeft:'5.938rem'}}>
						<a href='/' className='center'>Ir al inicio</a>
					</div>
				</div>
			</div>
		);
	}
}

export default PaginaNotFound;