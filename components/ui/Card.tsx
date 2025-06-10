"use client";

type cardProps = {
    name: string,
    description: string,
    src: string,
};

export default function Card({props}: {props:cardProps}) {
  return (
    <div className="max-w-96 max-h-96 bg-white rounded-lg overflow-hidden p-4">
        <img src={props.src ? props.src : 'dummy.png'} alt="" className="w-full h-full object-cover"/>
        <h1 className="absolute bottom-0 text-3xl">{props.name}</h1>
    </div>
  )
}
