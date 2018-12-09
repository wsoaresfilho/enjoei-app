import React, { PureComponent } from 'react';
import { fetchCheckout, fetchCoupon, confirmCheckout } from '../../api.js';
import { RadioGroup, Radio } from 'react-radio-group';
import ReactModal from 'react-modal';
import './styles/style.css';

ReactModal.setAppElement('#root');

class Checkout extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            checkout: {},
            coupon: {},
            selectedCoupon: 0,
            isModalOpen: false,
            checkoutSuccess: false,
        }

        this.handleCouponChange = this.handleCouponChange.bind(this);
        this.handleConfirmCheckout = this.handleConfirmCheckout.bind(this);
        this.handleCancelCheckout = this.handleCancelCheckout.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentDidMount() {
        const { checkoutId } = this.props.match.params;
        fetchCheckout(checkoutId).then((data) => {
            console.log(data);
            this.setState({
                product: data.product,
                checkout: data.checkout,
                coupon: data.checkout.availableCoupons.find((coupon) => {;
                    return coupon.id === this.state.selectedCoupon;
                }),
            });
        });
    }

    renderImage() {
        const { image } = this.state.product;
        return (
            <div className="checkout-image">
                <img src={ image } alt="Product" />
            </div>
        );
    }

    handleCouponChange(couponId) {
        console.warn(couponId);
        const checkoutId = this.state.checkout.id;
        fetchCoupon(checkoutId, couponId).then((data) => {
            console.log(data);
            this.setState({
                product: data.product,
                checkout: data.checkout,
                coupon: data.checkout.availableCoupons.find((coupon) => {
                    return coupon.id === couponId;
                }),
                selectedCoupon: couponId,
            });
        });
    }

    renderCoupons() {
        const coupons = this.state.checkout.availableCoupons.map((coupon) => {
            return (
                <div key={coupon.id} className="coupon-summary-item">
                    <Radio value={coupon.id} id={coupon.id} />
                    <label className="checkout-label" htmlFor={coupon.id}>{coupon.title}</label>
                    { this.renderMoney(-coupon.discount) }
                </div>
            );
        });
        const couponRadios = (
            <div className="checkout-coupons">
                <h3>coupons</h3>
                <RadioGroup 
                    name="coupon"
                    selectedValue={this.state.selectedCoupon}
                    onChange={this.handleCouponChange}
                >
                    <div className="coupon-summary-item">
                        <Radio value={0} id={0} />
                        <label className="checkout-label" htmlFor={0}>não usar cupom</label>
                    </div>
                    {coupons}
                </RadioGroup>
            </div>
        );
        return couponRadios;
    }

    renderMoney(value = 0) {
        let money = "";
        let color = "";
        if(value >= 0) {
            money = `R$ ${value.toFixed(2)}`;
            color = "regular";
        } else {
            const negative = value*-1.00;
            money = `- R$ ${negative.toFixed(2)}`;
            color = "red";
        }
        const moneyComponent = <div className={`checkout-money ${color}`}>{money.replace(".",",")}</div>
        return moneyComponent;
    }

    renderSummary() {
        const { product, checkout, coupon } = this.state;
        const summary = (
            <div className="checkout-summary">
                <h3>resumo</h3>
                <div className="checkout-summary-item">
                    <div className="checkout-label">valor original</div>
                    { this.renderMoney(product && product.price) }
                </div>
                <div className="checkout-summary-item">
                    <div className="checkout-label">cupom</div>
                    { this.renderMoney(coupon && -coupon.discount) }
                </div>
                <div className="checkout-summary-item">
                    <div className="checkout-label">frete</div>
                    { this.renderMoney(checkout && checkout.shippingPrice) }
                </div>
                <div className="checkout-summary-item">
                    <div className="checkout-label">total</div>
                    { this.renderMoney(checkout && checkout.totalPrice) }
                </div>
            </div>
        );
        return summary;
    }

    renderCheckoutButtons() {
        return (
            <div className="checkout-action-buttons container">
                <button className="cancel-btn" onClick={this.handleCancelCheckout}>cancelar</button>
                <button className="confirm-btn" onClick={this.handleConfirmCheckout}>confirmar</button>
            </div>
        )
    }

    handleConfirmCheckout() {
        const checkoutId = this.state.checkout.id;
        this.setState({ checkoutSuccess: true });
        confirmCheckout(checkoutId, 'post').then((res) => {
            console.log(res);
            this.handleOpenModal();
        });
    }

    handleCancelCheckout() {
        this.setState({ checkoutSuccess: false });
        this.handleOpenModal();
    }

    handleOpenModal() {
        this.setState({ isModalOpen: true });
    }

    handleCloseModal() {
        this.setState({ isModalOpen: false });
    }

    render() {
        const { product, checkout, isModalOpen, checkoutSuccess } = this.state;
        return (
            <div className="checkout">
                <div className="checkout-content container">
                    { product.image && this.renderImage() }
                    { checkout.availableCoupons && checkout.availableCoupons.length>0 && this.renderCoupons() }
                    { this.renderSummary() }
                </div>
                <div className="checkout-footer">
                    { this.renderCheckoutButtons() }
                </div>

                <ReactModal
                    isOpen={isModalOpen}
                    onRequestClose={this.handleCloseModal}
                    className="checkout-modal"
                    overlayClassName="checkout-modal-overlay"
                >
                    {checkoutSuccess &&
                        <div className="checkout-modal-content success">
                            <i className="fas fa-shopping-cart fa-lg"></i>
                            <h3>compra confirmada</h3>
                            <p>enviaremos atualizações sobre o pedido para seu email</p>
                        </div>
                    }
                    {!checkoutSuccess &&
                        <div className="checkout-modal-content cancel">
                            <i className="fas fa-shopping-cart fa-lg"></i>
                            <h3>compra cancelada</h3>
                            <p>o pedido não foi enviado e você não será cobrado</p>
                    </div>
                    }
                </ReactModal>
            </div>
        );
    }
}
 
export default Checkout;