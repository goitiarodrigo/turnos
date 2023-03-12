import { Component } from "react"
import ProfileUser from "../components/ProfileUser"

export default class Profile extends Component {
   componentDidMount() {
      window.scroll(0, 0)
   }
   render() {
      return (
         <>
            <ProfileUser history={this.props.history} />
         </>
      )
   }
}
