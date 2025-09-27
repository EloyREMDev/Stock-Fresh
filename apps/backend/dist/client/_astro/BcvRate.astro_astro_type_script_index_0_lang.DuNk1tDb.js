import{B as n}from"./endpoints.QH1VciTq.js";document.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("dolar-info");(async()=>{try{const t=await fetch(`${n}/api/dolar/rate`);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);const e=await t.json(),o=e.fechaActualizacion?new Date(e.fechaActualizacion).toLocaleDateString("es-ES",{year:"numeric",month:"long",day:"numeric"}):"Sin fecha",r=e.promedio?.toFixed(2)||"N/A";a.innerHTML=`
                        <p class="mt-2 text-sm text-[var(--text-secondary)]">
                            Valor actual al ${o}.
                        </p>
                        <div class="mt-4 text-4xl font-extrabold text-[var(--button-color)]">
                            Bs. ${r}
                        </div>
                    `}catch(t){console.error("Error al obtener la tasa del dólar:",t),a.innerHTML=`
                        <p class="mt-2 text-sm text-red-500">Error: No se pudo cargar la tasa.
                        <br>Asegúrate de que tu servidor backend esté en ejecución.</p>
                    `}})()});
