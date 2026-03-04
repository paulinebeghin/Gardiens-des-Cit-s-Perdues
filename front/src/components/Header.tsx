interface Props {
    name: string;
}

export const Header = ({ name }: Props) => {
    return (
        <h1 className="text-6xl max-sm:text-3xl text-center text-white py-10">
            {name}
        </h1>
    );
};