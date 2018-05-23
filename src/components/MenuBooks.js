import React, { Component } from 'react'
import {formatCurrency} from '../util/formatNumbers'
import collapseImg from '../assets/images/1x/icon_dropdown.png'

function LabelText(props) {
	const label = props.label;
	const text = props.text;
	 
	return (
		<div>
			<span className="labelprice">{label}</span>
			<span className="price">{text}</span>
		</div>
	);
}

function LabelPrice(props) {
	const label = props.label;
	const fieldPrice = props.fieldPrice;
	const units = props.units != undefined ? ' '+ props.units : ' MXN';
	 
	return (
		<LabelText label={label} text={formatCurrency(fieldPrice)+ units} />
	);
}

function BooksMenuItem(props){
	const {books, actionClick, bookSelected} = props;
	return books.map(book=>{
		const className = book.book == bookSelected ? "selected": "";
		return (<li key={book.book}><a className={className} onClick={_=>actionClick(book.book, bookSelected)}>{book.book.toUpperCase().split('_').join('/')}</a></li>)
	})
}

const MenuBooks = ({ bookSelected, books, ticker, selectBook }) => {
	console.log("Render.MenuBooks", this);
	const formatBook = bookSelected.toUpperCase().split('_').join('/');
	const media = (ticker.high-ticker.low)/2 + ticker.low;
	const variation = (ticker.last * 100)/media;
	const variatoinFix = variation.toFixed(2);
	const sign = ticker.last > media ? "+" : "";
	const percent = ((ticker.last - media) * 100)/ticker.last;
	const percentFix  = percent.toFixed(2);
	console.log("variation", media);
	return (
		<ul className="header2-menu">
			<li className="vcenter title" >
				<span className="greenText">{formatBook}  <img src={collapseImg} /></span>
				<ul className="menubooks">
					<BooksMenuItem bookSelected={bookSelected} books={books} actionClick={selectBook}/>
				</ul>
			</li>
			<li className="vcenter">
				<LabelPrice label={"Volumen 24 hrs."} fieldPrice={ticker.volume} units="BTC"/>
			</li>
			<li className="vcenter">
				<LabelPrice label={"Max."} fieldPrice={ticker.high} />
			</li>
			<li className="vcenter">
				<LabelPrice label={"Min."} fieldPrice={ticker.low}/>
			</li>
			<li className="vcenter">
				<LabelText label={"Variación "} text={sign + formatCurrency(variation) + 'MXN (' +  percentFix + '%)'} units=""/>
			</li>
		</ul>
	);
}
export default MenuBooks