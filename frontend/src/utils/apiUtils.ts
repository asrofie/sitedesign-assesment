/**
 * Handles API calls with automatic loading state, error handling, and success callbacks.
 */
export async function handleApiCall(
    apiFunction: () => Promise<any>,
    setLoading: (value: boolean) => void,
    successCallback?: (response: any) => void,
    errorCallback?: (error: any) => void
) {
    setLoading(true);
    try {
        const response = await apiFunction();
        if (response.code === 1000 || response.success) {
            successCallback?.(response);
        } else if(response.Result) { // for handling responses from webmail lite (email)
            successCallback?.(response.Result);
        } else {
            // toast({
            //     title: "There seems to be an error",
            //     duration: 6000,
            //     variant: "destructive",
            //     description: response.msg,
            // });
            errorCallback?.(response);
        }
    } catch (err) {
        console.error("API Error:", err);
        errorCallback?.(err);
    } finally {
        setLoading(false);
    }
}