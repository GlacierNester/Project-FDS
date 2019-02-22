import React, { Component } from "react";
import { Card, Modal  } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import LazyLoad from "react-lazyload";
import ImageModalGallery from "./ImageModalGallery";

import "react-image-gallery/styles/css/image-gallery.css";
import "./style.css";

class Gallery extends Component {
	constructor(props){
		super(props);

		this.state={visible:false, width:"", index:0, scoll_index:10, hasMore:true};

		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", "/gallery/YandJ/images_info.txt", false);
		rawFile.onreadystatechange = () =>
		{
			if(rawFile.readyState === 4)
			{
				if(rawFile.status === 200 || rawFile.status === 0)
				{
					var allText = rawFile.responseText;
					this.images = allText.split("\n");
				}
			}
		};
		rawFile.send(null);

		let cards = [];
		for(let i = this.state.scoll_index-10;i < this.state.scoll_index;i++){
			cards.push(
				<Card
					hoverable
					key={i}
					bodyStyle={{padding: "0"}}
					className="cards"
					onClick={() => this.showModal(i)}
					cover={
						<LazyLoad placeholder={<img alt="placeholder" className="small_image" src="https://via.placeholder.com/250" />}>
							<img alt="example" className="small_image" src={"/gallery/YandJ/" + this.images[i]} />
						</LazyLoad>
					}
				/>
			);
		}

		this.gallery_images = [];

		this.images.forEach(image => {
			this.gallery_images.push({original:"/gallery/YandJ/" + image, originalClass:"gallery_image"});
		});

		this.state.cards = cards;

		this.cancel=this.cancel.bind(this);
		this.showModal=this.showModal.bind(this);
	}

	render(){
		return (
			<main className="Gallery">
				<div className="title"><h1>Gallery</h1></div>
				<InfiniteScroll
					dataLength={this.state.cards.length}
					next={this.loadFunc}
					hasMore={this.state.hasMore}
					loader={<h4>Loading ...</h4>}
				>
					{this.state.cards}
				</InfiniteScroll>
				<Modal visible={this.state.visible} id="modal" onCancel={this.cancel} bodyStyle={{padding:"0"}} 
					footer={null}>
					<ImageModalGallery index={this.state.index} gallery_images={this.gallery_images} />
				</Modal>
			</main>
		);
	}

	loadFunc = () => {

		if(this.state.scoll_index === this.images.length){
			this.setState({hasMore:false});
			return;
		}
		
		let scoll_index = this.state.scoll_index + 10;
		if(scoll_index >= this.images.length){
			scoll_index = this.images.length;
		}

		let cards = [];
		for(let i = scoll_index-10;i < scoll_index;i++){
			cards.push(
				<Card
					hoverable
					key={i}
					bodyStyle={{padding: "0"}}
					className="cards"
					onClick={() => this.showModal(i)}
					cover={
						<LazyLoad width="100%" height="100%" placeholder={<img alt="placeholder" className="small_image" src="https://via.placeholder.com/250" />}>
							<img alt="example" className="small_image" src={"/gallery/YandJ/" + this.images[i]} />
						</LazyLoad>
					}
				/>
			);
		}
		this.setState((prevState) => {return {scoll_index:scoll_index, cards:prevState.cards.concat(cards)};});
	}

	cancel(){
		this.setState({visible:false});
	}

	showModal(index){
		this.setState({
			visible:true, index:index
		});
	}
}

export default Gallery;