import reducer,{ clearLoginStatus } from "../../store/userSlice";
it("should return the initial state", () => {
    expect(
      reducer(
        {
            userObj: {},
            isSuccessLogin: false,
            isLoadingLogin: false,
            isErrorLogin: false,
            invalidLoginLogin:" "
        },
        {}
      )
    ).toEqual({
        userObj: {},
        isSuccessLogin: false,
        isLoadingLogin: false,
        isErrorLogin: false,
        invalidLoginLogin:" "
    });
});
it("should reset the user", () => {
   expect(
     reducer(
       {
         userObj: { type: "User", username: "testUser", password: "testpassword" },
         isSuccessLogin: true,
         isLoadingLogin: false,
         invalidLoginLogin: "",
       },
     clearLoginStatus()
     )
   ).toEqual({
     userObj: {},
     isSuccessLogin: false,
     isLoadingLogin: false,
     invalidLoginLogin: "",
   });
 });