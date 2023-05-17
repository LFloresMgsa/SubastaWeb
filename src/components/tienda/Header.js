import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useHistory, useParams } from 'react-router-dom';


import './tienda.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));


export const Header = ({
	allProducts,
	setAllProducts,
	total,
	countProducts,
	setCountProducts,
	setTotal,
}) => {
	const [active, setActive] = useState(false);
	const history = useHistory();

	const onDeleteProduct = product => {
		const results = allProducts.filter(
			item => item.Cab_cCatalogo !== product.Cab_cCatalogo
		);

		setTotal(total - product.Dvd_nImporte * product.quantity);
		setCountProducts(countProducts - product.quantity);
		setAllProducts(results);
	};

	const onCleanCart = () => {
		setAllProducts([]);
		setTotal(0);
		setCountProducts(0);
	};

	const onSaveCart = () => {

		//history.push(`/FinalizarCompra`);

		history.push({
			pathname: '/FinalizarCompra',
			state: allProducts
			
		  });

		//setAllProducts([]);
		//setTotal(0);
		//setCountProducts(0);
	};

	return (
		<header>


			<div className='container-icon'>
				<div
					className='container-cart-icon'
					onClick={() => setActive(!active)}
				>
					
					
					<div className='count-products'>
						<span id='contador-productos'>{countProducts}</span>
					</div>
				</div>

				<div
					className={`container-cart-products ${active ? '' : 'hidden-cart'
						}`}
				>
					{allProducts.length ? (
						<>

							<TableContainer component={Paper}>
								<Table aria-label="customized table">
									<TableHead>
										<TableRow>


											<StyledTableCell align="left">Cant.</StyledTableCell>
											<StyledTableCell align="left">Descripción</StyledTableCell>
											<StyledTableCell align="left">Codigo</StyledTableCell>
											<StyledTableCell align="left">Precio</StyledTableCell>
											<StyledTableCell align="left">Elim.</StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{allProducts.map((product) => (
											<StyledTableRow key={product.Cab_cCatalogo}>


												<StyledTableCell align="left">{product.quantity}</StyledTableCell>
												<StyledTableCell align="left">{product.Cab_cDescripcion}</StyledTableCell>
												<StyledTableCell align="left"> {product.Cab_cCatalogo}</StyledTableCell>
												<StyledTableCell align="rigth">S/. {product.Dvd_nImporte}</StyledTableCell>
												<StyledTableCell align="rigth">
													<svg
														xmlns='http://www.w3.org/2000/svg'
														fill='none'
														viewBox='0 0 24 24'
														strokeWidth='1.5'
														stroke='currentColor'
														className='icon-close'
														onClick={() => onDeleteProduct(product)}
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='M6 18L18 6M6 6l12 12'
														/>
													</svg>
												</StyledTableCell>
											</StyledTableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>

							<div className='cart-total'>
								<h3>Total:</h3>
								<span className='total-pagar'>S/.{total}</span>
							</div>

							<button className='btn-clear-all' onClick={onCleanCart}>
								Vaciar Carrito
							</button>

							<button className='btn-save-all' onClick={onSaveCart}>
								Ptoceder el Pago
							</button>
						</>
					) : (
						<p className='cart-empty'>El carrito está vacío</p>
					)}
				</div>
			</div>
		</header>
	);
};