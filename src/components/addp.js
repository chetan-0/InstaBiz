import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import mark from "../abis/market.json";
import Main from "./Main";
import style from "../components/App.css";
class addp extends Component {
  async componentWillMount() {
    await this.loadweb3();
    await this.loadBlockchainData();
  }
  async loadweb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }
  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = mark.networks[networkId];
    if (networkData) {
      const marketplace = new web3.eth.Contract(mark.abi, networkData.address);
      this.setState({ marketplace });
      const productCount = await marketplace.methods.productcount().call();
      this.setState({ productCount });
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call();
        this.setState({
          products: [...this.state.products, product],
        });
      }
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      productcount: 0,
      products: [],
      loading: true,
    };
    this.createproduct = this.createproduct.bind(this);
    this.purchaseproduct = this.purchaseproduct.bind(this);
  }
  createproduct(name, price, desc, img) {
    this.setState({ loading: true });
    this.state.marketplace.methods
      .createproduct(name, price, desc, img)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }
  purchaseproduct(id, price) {
    this.setState({ loading: true });
    this.state.marketplace.methods
      .purchase(id)
      .send({ from: this.state.account, value: price })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <div className={style.content}>
        {" "}
        <main role="main" className="col-lg-12 d-flex">
          {
            <Main
              products={this.state.products}
              createproduct={this.createproduct}
              purchaseproduct={this.purchaseproduct}
            />
          }
        </main>
      </div>
    );
  }
}

export default addp;


