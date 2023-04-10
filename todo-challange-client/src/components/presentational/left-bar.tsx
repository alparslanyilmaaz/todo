import { GrClose } from "react-icons/gr";
import { useGetGroups } from "../../services/group/use-get-groups";
import { CreateGroup } from "../functional/create-group";

interface Props {
  mobileCloseCb?: () => void;
}

export const LeftBar = ({ mobileCloseCb }: Props) => {
  const { data: groups } = useGetGroups();

  return <div className="h-screen fixed max-w-[25rem] w-[25rem] bg-white pt-[5rem] px-10 lg:px-[5rem]">
    <div className="flex justify-between w-full">
      <p className="text-2xl font-bold">Groups</p>
      <button className="block lg:hidden" type="button" onClick={() => mobileCloseCb?.()}>
        <GrClose />
      </button>
    </div>
    {
      groups?.map((group) => {
        return <div className="flex items-center mt-3" key={group.id}>
          <div className="absolute w-4 h-4 rounded-full" style={{
            backgroundColor: group.color
          }} />
          <p className="truncate ml-7">{group.name}</p>
        </div>
      })
    }

    <CreateGroup />

  </div>
}