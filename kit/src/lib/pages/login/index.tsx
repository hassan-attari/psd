import { useTheme } from '@mui/material/styles';
import { Button } from '../../components';

export const Login = () => {
  const theme = useTheme();

  const renderColorSet = (label: string, colors: Record<string, unknown>) => (
    <div key={label} className="mb-8">
      <h2 className="text-lg font-semibold mb-2 capitalize">{label}</h2>
      <div className="flex flex-wrap gap-4">
        {Object.entries(colors)
          .filter(([_, value]) => typeof value === 'string')
          .map(([key, value]) => {
            const color = value as string;
            return (
              <div key={key} className="flex flex-col items-center text-xs">
                <div
                  className="w-16 h-8 rounded shadow mb-1"
                  style={{
                    width:60,
                    height:20,
                    backgroundColor: color,
                    borderRadius: 5,
                  }}
                  title={`${label}.${key}`}
                />
                <span>{key}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
  

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Login Page</h1>
      <Button />

      <div className="mt-10 flex  gap-4">
        {Object.entries(theme.palette).map(([label, colors]) =>
          typeof colors === 'object' ? renderColorSet(label, colors) : null
        )}
      </div>
    </div>
  );
};
















