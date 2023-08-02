type Activity = {
    /**
     * Activity id as defined by the database
     */
    id: number,

    /**
     * Activity name as entered when created
     */
    name: string

    /**
     * Description as entered when created
     */
    description: string

    /**
     * Country name of place
     */
    country: string

    /**
     * place name of place
     */
    place: string

    /**
     * Country id
     */
    cid: number
    /**
     * Place id
     */
    pid: number
}