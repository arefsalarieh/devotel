import { getFormData } from "../../services/form"


const HomeForm = () => {
    const {data,isLoading,error} = getFormData()

    data && console.log(data)
  return (
    <div>HomeForm</div>
  )
}

export default HomeForm