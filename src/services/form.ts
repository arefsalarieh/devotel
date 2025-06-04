import { useGetQuery } from "../custumHook/tanstack/useGetQuery"

const baseUrl = 'https://assignment.devotel.io'

const getFormData = () =>{
    const result = useGetQuery(`${baseUrl}/api/insurance/forms`,['form-data'])
    return result
}

export {getFormData}