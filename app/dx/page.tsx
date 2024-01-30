// @ts-nocheck
import DxHeader from "@/components/dx-header";
import Particles from "@/components/particles";
import { extractFromLink } from "md-to-jsonify";

export const metadata = {
  title: "Dx Matters",
};
const DxPage = async () => {
    const url =
      "https://api.github.com/repos/workos/awesome-developer-experience/git/blobs/fe28415d2d46ac325a12df8292f7cc005aef57ce";

    const res = await extractFromLink(url);
    console.log(res);
  return (
    <div className="min-h-screen  mx-auto max-w-4xl mt-12 px-6 lg:px-8 bg-transparent overflow-hidden bg-gradient-to-tr from-transparent to-transparent">
       <Particles quantity={200}/>

       <DxHeader />
    </div>
  );
};

export default DxPage;
