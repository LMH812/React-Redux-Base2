import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { uiActions } from './store/ui-slice'
import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products'
import Notification from './components/UI/Notification'
import { sendCartData, fetchCartData } from './store/cart-actions'
let isInitial = true
function App() {
    const dispatch = useDispatch()
    const showCart = useSelector((state) => state.ui.cartIsVisible)
    const cart = useSelector((state) => state.cart)
    const showNotification = useSelector((state) => state.ui.notification)
    useEffect(() => {
        dispatch(fetchCartData())
    },[dispatch])
    useEffect(() => {
        // const sendCartData = async () => {
        //     dispatch(
        //         uiActions.showNotification({
        //             status: 'pending',
        //             title: 'Sending...',
        //             message: 'Sending cart data',
        //         })
        //     )
        //     const response = await fetch('https://react-http-7d455-default-rtdb.firebaseio.com/cart.json', {
        //         method: 'PUT',
        //         body: JSON.stringify(cart),
        //     })
        //     if (!response.ok) {
        //         throw new Error('Sending cart data failed.')
        //     }
        //     dispatch(
        //         uiActions.showNotification({
        //             status: 'success',
        //             title: 'Success!',
        //             message: 'Send cart data successfully!',
        //         })
        //     )
        // }
        if (isInitial) {
            isInitial = false
            return
        }
        if (cart.changed) {
            dispatch(sendCartData(cart))
        }
        // sendCartData().catch((error) => {
        //     dispatch(
        //         uiActions.showNotification({
        //             status: 'error',
        //             title: 'Error!',
        //             message: 'Send cart data failed!',
        //         })
        //     )
        // })
    }, [cart, dispatch])
    return (
        <Layout>
            {showNotification && <Notification title={showNotification.title} message={showNotification.message} />}
            {showCart && <Cart />}
            <Products />
        </Layout>
    )
}

export default App
