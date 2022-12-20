const pages = {};
const base_url = "http://127.0.0.1:8000/api/v0.1/apis/";

pages.Console = (title, values, oneValue = true) => {
  console.log("---" + title + "---");
  if (oneValue) {
    console.log(values);
  } else {
    for (let i = 0; i < values.length; i++) {
      console.log(values[i]);
    }
  }
  console.log("--/" + title + "---");
};
pages.loadFor = (page) => {
  eval("pages.load_" + page + "();");
};
pages.postAPI = async (api_url, api_data, api_token = null) => {
  try {
    return await axios.post(api_url, api_data, {
      headers: {
        Authorization: "token " + api_token,
      },
    });
  } catch (error) {
    pages.Console("Error from Linking (POST)", error);
  }
};

pages.getAPI = async (api_url) => {
  try {
    return await axios(api_url);
  } catch (error) {
    pages.Console("Error from Linking (GET)", error);
  }
};
pages.load_register = () => {
  const signup_btn = document.getElementById("register");

  const signup = async () => {
    const signup_url = base_url + "signup";

    const signup_data = new URLSearchParams();
    signup_data.append("username", document.getElementById("username").value);
    signup_data.append("email", document.getElementById("email").value);
    signup_data.append("password", document.getElementById("password").value);

    const response = await pages.postAPI(
      signup_url,
      signup_data
    );
    if (response.data.status == "error") {
        console.log(response.data.result);
    }
    if (response.data.status == "success") {
      console.log(response.data.result);
    }
  };
  signup_btn.addEventListener("click", signup);
};

