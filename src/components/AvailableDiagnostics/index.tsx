import { useState, useCallback } from 'react';
import { colors, Donut, Plot } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';
import Checkbox from '@semcore/ui/checkbox';
const pieColors = [colors['blue-03'], colors['green-02'], colors['violet-04']];

const AvailableDiagnostics = ({ finalized_initialized }) => {
  const data = finalized_initialized;
  console.log({ data });
  const [selected, setSelected] = useState(['b']);
  const handleCheckboxToggle = useCallback(
    (name) => () => {
      setSelected((selected) => {
        if (selected.includes(name)) {
          return selected.filter((selectedName) => selectedName !== name);
        } else {
          return [...selected, name];
        }
      });
    },
    [setSelected],
  );
  return (
    <Flex mt={15} alignItems='center' flexWrap>
      <Plot height={150} width={150} m='10px 28px 24px 0' data={data}>
        <Donut innerRadius={40}>
          {Object.keys(data).map((name, index) => (
            <Donut.Pie
              key={name}
              dataKey={name}
              color={pieColors[index]}
              name={`${name}`}
              active={selected.includes(name)}
            />
          ))}
        </Donut>
        <Donut.Tooltip>
          {({ dataKey, name }) => {
            return {
              children: (
                <>
                  <Donut.Tooltip.Title>{name}</Donut.Tooltip.Title>
                  <Flex justifyContent='space-between'>
                    <p>{data[dataKey]}</p>
                  </Flex>
                </>
              ),
            };
          }}
        </Donut.Tooltip>
      </Plot>
      <Flex direction='column'>
        {Object.keys(data).map((name, index) => {
          return (
            <Checkbox key={name} id={name} theme={pieColors[index]}>
              <Checkbox.Value
                value={name}
                checked={selected.includes(name)}
                onChange={handleCheckboxToggle(name)}
              />
              <Checkbox.Text>{`${name}`}</Checkbox.Text>
            </Checkbox>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default AvailableDiagnostics;
