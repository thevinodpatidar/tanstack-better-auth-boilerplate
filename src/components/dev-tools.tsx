import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

export function DevTools() {
  return (
    <TanStackDevtools
      config={{
        position: "bottom-right",
      }}
      eventBusConfig={{
        debug: false,
        connectToServerBus: true,
      }}
      plugins={[
        {
          name: "Tanstack Router",
          render: <TanStackRouterDevtoolsPanel />,
        },
        {
          name: "TanStack Query",
          render: <ReactQueryDevtools />,
        },
        FormDevtoolsPlugin(),
      ]}
    />
  );
}
